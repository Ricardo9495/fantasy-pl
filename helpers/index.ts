import { Team } from "../models"

const CONFIG = {
  LEAGUE_ID: '484834',
  LEAGUE_INFO_URL: 'https://fantasy.premierleague.com/api/leagues-classic/${id}/standings/',
  LEAGUE_HISTORY_URL: 'https://fantasy.premierleague.com/api/entry/${id}/history/',
  JOIN_LEAGUGE_URL: 'https://fantasy.premierleague.com/leagues/auto-join/lzb0ck',
  JOIN_H2H_URL: 'https://fantasy.premierleague.com/leagues/auto-join/cnk031',
  BANNED_LIST: ['510600'],
  NOT_BETTING_LIST: ['3888393', '3808607', '3907773', '2369418', '3411024', '8044411'],
  WEEKLY_BET: 200,
  LEG_BET: 1000,
  FIRST_POS_RATIO: 0.7,
  SECOND_POS_RATIO: 0.3,
  FIRST_LEG_RANGE: {
    FROM_WEEK: 0,
    TO_WEEK: 19,
  },
  SECOND_LEG_RANGE: {
    FROM_WEEK: 19,
    TO_WEEK: 38,
  },
  START_DATE_OF_2ND_LEG: 'Dec 28, 2022 00:00:00'
}

const fetchInfo = async (url: string) => {
  return await fetch(
    url,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    }
  )
}

const concatApiUrlWithParameter = (apiUrl: string, id: string): string => {
  return apiUrl.replace('${id}', id);
}

const teamList = async () => {
  try {
    const league: Array<Team> = await leagueInfo()
    const teamList: Array<Team> = await teamWithHistoriesList(league)
    const teamListWithLegsPoints: Array<Team> = calculateLegsPoint(teamList)
    const teamListWithBet: Array<Team> = calculateBet(teamListWithLegsPoints);
    const fullCalculateTeamList: Array<Team> = calculateLegWinningBet(teamListWithBet);
    return fullCalculateTeamList;
  } catch (error) {
    return []
  }
}

const calculateLegWinningBet = (sortedTeamList: Array<Team>) => {
  const bettingTeamList = sortedTeamList.filter(team => team.isBetting);

  const firstLegWinning = sortTeamlist(bettingTeamList, true);
  firstLegWinning[0].firstLegWinningMoney = bettingTeamList.length * CONFIG.LEG_BET * CONFIG.FIRST_POS_RATIO
  firstLegWinning[1].firstLegWinningMoney = bettingTeamList.length * CONFIG.LEG_BET * CONFIG.SECOND_POS_RATIO

  const secondLegWinning = sortTeamlist(bettingTeamList, false);
  secondLegWinning[0].sencondLegWinningMoney = bettingTeamList.length * CONFIG.LEG_BET * CONFIG.FIRST_POS_RATIO
  secondLegWinning[1].sencondLegWinningMoney = bettingTeamList.length * CONFIG.LEG_BET * CONFIG.SECOND_POS_RATIO

  return sortedTeamList;
}

const leagueInfo = async () => {
  try {
    const result = await fetchInfo(
      concatApiUrlWithParameter(
        CONFIG.LEAGUE_INFO_URL,
        CONFIG.LEAGUE_ID
      )
    )

    const data = await result.json()
    return data['standings']['results'].filter(
      (team: Team) => !CONFIG.BANNED_LIST.includes(team.entry.toString())
    )
  } catch (error) {
    return { notFound: true }
  }
}

const teamWithHistoriesList = async (teamList: Array<Team>) => {
  const fullTeam = teamList.map(async (team: Team) => {
    const res = await fetchInfo(
      concatApiUrlWithParameter(
        CONFIG.LEAGUE_HISTORY_URL,
        `${team.entry}`
      )
    )

    const data = await res.json()
    return new Team(team, data['current'])
  })

  const rest = await Promise.all(fullTeam)
  const list: Array<Team> = JSON.parse(JSON.stringify(rest));
  list.forEach((team: Team) => {
    // Cuong start from 10
    // if (team.entry === 8275914) { team.startBettingWeek = 10 };
    if(!team.history || team.history.length < 1) return;
    let startWeek = team.history[0].event;
    const firstWeek = 1
    if(startWeek !== firstWeek) {
      while(startWeek > firstWeek) {
        startWeek -= 1
        team.history.unshift({event: startWeek, points: 0, event_transfers_cost: 0})
      }
    }
  });
  return list
}

const calculateLegsPoint = (teamList: Array<Team>) => {
  teamList.forEach((team) => {
    team.firstLegTotal = team.history.slice(CONFIG.FIRST_LEG_RANGE.FROM_WEEK, CONFIG.FIRST_LEG_RANGE.TO_WEEK).reduce((a, b) => a + (b.points - b.event_transfers_cost), 0);
    team.secondLegTotal = team.history.slice(CONFIG.SECOND_LEG_RANGE.FROM_WEEK, CONFIG.SECOND_LEG_RANGE.TO_WEEK).reduce((a, b) => a + (b.points - b.event_transfers_cost), 0);
  })
  return teamList;
}

const calculateBet = (teamList: Array<Team>) => {
  for (let index = teamList[0].history.length - 1; index >= 0; --index) {
    let winner = 0;
    let loser = 0;

    const bettingTeamList = teamList.filter(team => team.isBetting);
    const weekPoints = bettingTeamList.map(team => (team.history[index].points - team.history[index].event_transfers_cost));
    const highestPoint = Math.max(...weekPoints);

    bettingTeamList.forEach((team) => {
      if (index >= team.startBettingWeek - 1) {
        const week = team.history[index];
        const week_point = week.points - week.event_transfers_cost;
        if (week_point == highestPoint) {
          week.win = true;
          team.winning_weeks.push(index + 1);
          winner++;
        } else {
          week.win = false;
          loser++;
        }
      }
    })

    bettingTeamList.forEach((team) => {
      if (index >= team.startBettingWeek - 1) {
            const week = team.history[index];
          if (week.win) {
            if (index < CONFIG.FIRST_LEG_RANGE.TO_WEEK) {
              team.firstLegWeeklyWinningMoney += (loser * CONFIG.WEEKLY_BET) / winner;
            } else {
              team.sencondLegWeeklyWinningMoney += (loser * CONFIG.WEEKLY_BET) / winner;
            }

          } else {
            if (index < CONFIG.FIRST_LEG_RANGE.TO_WEEK) {
              team.firstLegWeeklyWinningMoney -= CONFIG.WEEKLY_BET;
            } else {
              team.sencondLegWeeklyWinningMoney -= CONFIG.WEEKLY_BET;
            }
          }
        }
      }
    )
  }

  return teamList;
}

const sortTeamlist = (teamList: Array<Team>, isFirstLeg: boolean) => {
  const sortedList = teamList.sort((a, b) => {
    const rankA = isFirstLeg ? a.firstLegTotal : a.secondLegTotal;
    const rankB = isFirstLeg ? b.firstLegTotal : b.secondLegTotal;

    if (rankA < rankB) {
      return 1;
    }

    if (rankA > rankB) {
      return -1;
    }

    return 0;
  });

  return sortedList;
}

const sortByTotal = (a: Team, b: Team) => {
  const rankA = a.total;
  const rankB = b.total;

  if (rankA < rankB) {
    return 1;
  }

  if (rankA > rankB) {
    return -1;
  }

  return 0;
}

const sortByCurrentLegTotal = (a: Team, b: Team, isFirstLeg: boolean) => {
  const rankA = isFirstLeg ? a.firstLegTotal : a.secondLegTotal;
  const rankB = isFirstLeg ? b.firstLegTotal : b.secondLegTotal;

  if (rankA < rankB) {
    return 1;
  }

  if (rankA > rankB) {
    return -1;
  }

  return 0;
}

export const HELPERS = {
  concatApiUrlWithParameter,
  fetchInfo,
  CONFIG,
  teamList,
  sortByTotal,
  sortByCurrentLegTotal
}
