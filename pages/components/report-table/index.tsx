import {
  List,
  ListItem,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import theme from '../../../theme'
import { Team } from '../../../models'
import clsx from 'clsx'
import { HELPERS } from '../../../helpers'

interface ReportTableProps {
  teamList: Array<Team>
  isFirstLeg: boolean
  isDisplayAll: boolean
}

const useStyles = makeStyles({
  table: {
    minWidth: 1200,
  },
  tableHead: {
    backgroundColor: '#EFEFEF',
  },
  entryName: {
    color: theme.palette.primary.light,
  },
  winningCell: {
    color: theme.palette.primary.light,
  },
})

export const ReportTable = (props: ReportTableProps) => {
  const { teamList, isFirstLeg, isDisplayAll } = props
  const [fromWeek, setFromWeek] = useState(
    HELPERS.CONFIG.FIRST_LEG_RANGE.FROM_WEEK
  )
  const [toWeek, setToWeek] = useState(HELPERS.CONFIG.FIRST_LEG_RANGE.TO_WEEK)
  const [orderByTotal, setOrderByTotal] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (isFirstLeg) {
      setFromWeek(HELPERS.CONFIG.FIRST_LEG_RANGE.FROM_WEEK)
      setToWeek(HELPERS.CONFIG.FIRST_LEG_RANGE.TO_WEEK)
    } else {
      setFromWeek(HELPERS.CONFIG.SECOND_LEG_RANGE.FROM_WEEK)
      setToWeek(HELPERS.CONFIG.SECOND_LEG_RANGE.TO_WEEK)
    }
  }, [isFirstLeg])

  const handleSortByTotal = () => {
    if (orderByTotal) return
    setOrderByTotal(!orderByTotal)
  }

  const handleSortByCurrentLegPoint = () => {
    if (!orderByTotal) return
    setOrderByTotal(!orderByTotal)
  }

  const getComparator = (a: Team, b: Team) => {
    return orderByTotal
    ? HELPERS.sortByTotal(a, b)
    : HELPERS.sortByCurrentLegTotal(a, b, isFirstLeg)
  };
  const weekHeaders =
    Array.isArray(teamList) &&
    teamList[0] &&
    Array.isArray(teamList[0].history) &&
    teamList[0].history
      .slice(fromWeek, toWeek)
      .slice(isDisplayAll ? 0: (teamList[0].history.length - 2), teamList[0].history.length)
      .reverse()
      .map((week) => (
        <TableCell key={`week${week.event}`}>{`GW${week.event}`}</TableCell>
      ))

  const weekResults = (team: Team) =>
    Array.isArray(team.history) &&
    team.history
      .slice(fromWeek, toWeek)
      .slice(isDisplayAll ? 0: (teamList[0].history.length - 2), teamList[0].history.length)
      .reverse()
      .map((week) => (
        <TableCell
          key={`week${week.event}`}
          className={clsx(week.win ? classes.winningCell : '')}
        >
          {week.event_transfers_cost
            ? `${week.points}(-${week.event_transfers_cost}) = ${
                week.points - week.event_transfers_cost
              }`
            : `${week.points}`}
        </TableCell>
      ))

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Team&nbsp;&&nbsp;Manager</TableCell>
            <TableCell key="leg-total">
              <TableSortLabel active={orderByTotal} direction="desc" onClick={handleSortByTotal}>
                Total
              </TableSortLabel>
            </TableCell>
            <TableCell key="current-leg-total">
              <TableSortLabel active={!orderByTotal} direction="desc" onClick={handleSortByCurrentLegPoint}>
                Current Leg Total
              </TableSortLabel>
            </TableCell>
            <TableCell>Yen</TableCell>
            {weekHeaders}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(teamList) &&
          teamList.sort((a,b) => getComparator(a, b))
            .map((team, index) => (
              <TableRow key={team.player_name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <List>
                    <ListItem className={classes.entryName}>
                      {team.entry_name}
                    </ListItem>
                    <ListItem>{team.player_name}</ListItem>
                  </List>
                </TableCell>
                <TableCell>{team.total}</TableCell>
                <TableCell>
                  {isFirstLeg ? team.firstLegTotal : team.secondLegTotal}
                </TableCell>
                <TableCell>
                  <List>
                    <ListItem>
                      {team.isBetting
                        ? isFirstLeg
                          ? team.firstLegWeeklyWinningMoney
                          : team.sencondLegWeeklyWinningMoney
                        : '-'}
                    </ListItem>
                    {isFirstLeg && team.firstLegWinningMoney !== 0 && (
                      <ListItem>
                        <Typography
                          variant="caption"
                          color="primary"
                        >
                          {`(+${team.firstLegWinningMoney})`}
                        </Typography>
                      </ListItem>
                    )}
                    {!isFirstLeg && team.sencondLegWinningMoney !== 0 && (
                      <ListItem>
                        <Typography
                          variant="caption"
                          color="primary"
                        >
                          {`(+${team.sencondLegWinningMoney})`}
                        </Typography>
                      </ListItem>
                    )}
                  </List>
                </TableCell>
                {weekResults(team)}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ReportTable
