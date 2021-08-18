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
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import theme from '../../../theme'
import { Team } from '../../models'
import clsx from 'clsx'
import { HELPERS } from '../../../helpers'

interface ReportTableProps {
  teamList: Array<Team>
  isFirstLeg: boolean
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
  const { teamList, isFirstLeg } = props
  const [fromWeek, setFromWeek] = useState(
    HELPERS.CONFIG.FIRST_LEG_RANGE.FROM_WEEK
  )
  const [toWeek, setToWeek] = useState(HELPERS.CONFIG.FIRST_LEG_RANGE.TO_WEEK)
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

  const weekHeaders = teamList[0].history
    .slice(fromWeek, toWeek)
    .reverse()
    .map((week) => (
      <TableCell key={`week${week.event}`}>{`GW${week.event}`}</TableCell>
    ))

  const weekResults = (team: Team) =>
    team.history
      .slice(fromWeek, toWeek)
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
          <TableCell>Rank</TableCell>
          <TableCell>Team&nbsp;&&nbsp;Manager</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Current Leg Total</TableCell>
          <TableCell>Yen</TableCell>
          {weekHeaders}
        </TableHead>
        <TableBody>
          {teamList.map((team, index) => (
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
                  {team.legWinningMoney !== 0 && (
                    <ListItem>
                      <Typography
                        variant="caption"
                        color="primary"
                      >{`(+${team.legWinningMoney})`}</Typography>
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
