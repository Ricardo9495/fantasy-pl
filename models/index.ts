import { HELPERS } from '../helpers'

export class Team {
  id: string
  event_total: string
  player_name: string
  rank: string
  last_rank: string
  rank_sort: string
  total: string
  entry: string
  entry_name: string
  firstLegWeeklyWinningMoney: number
  sencondLegWeeklyWinningMoney: number
  sencondLegWinningMoney: number
  firstLegWinningMoney: number
  legWinningMoney: number
  winning_weeks: Array<number>
  history: Array<WeekResults>
  isBetting: boolean
  firstLegTotal: number
  secondLegTotal: number

  constructor(params: Team, histories: Array<WeekResults>) {
    this.id = params.id
    this.event_total = params.event_total
    this.player_name = params.player_name
    this.rank = params.rank
    this.last_rank = params.last_rank
    this.rank_sort = params.rank_sort
    this.total = params.total
    this.entry = params.entry
    this.entry_name = params.entry_name
    this.firstLegWeeklyWinningMoney = 0
    this.firstLegWinningMoney = 0
    this.sencondLegWeeklyWinningMoney = 0
    this.sencondLegWinningMoney = 0
    this.legWinningMoney = 0
    this.firstLegTotal = 0
    this.secondLegTotal = 0
    this.winning_weeks = []
    this.history = histories
    this.isBetting = !HELPERS.CONFIG.NOT_BETTING_LIST.includes(
      this.entry.toString()
    )
  }
}

interface WeekResults {
  event: number
  points: number
  total_points: number
  rank: number
  rank_sort: number
  overall_rank: number
  bank: number
  value: number
  event_transfers: number
  event_transfers_cost: number
  points_on_bench: number
  win?: boolean
}

export const createTeam = (params: Team, histories: Array<WeekResults>) => {
  return new Team(params, histories)
}

export const TeamModel = {
  Team,
  createTeam,
}

export default TeamModel
