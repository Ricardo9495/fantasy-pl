import {
  FormControl,
  Select,
  SelectChangeEvent,
  Switch,
  Theme,
  Typography,
} from '@mui/material'
import React from 'react'
import { createStyles, makeStyles } from '@mui/styles'

interface LegSelectProps {
  isFirstLeg: boolean
  setIsFirstLeg: React.Dispatch<React.SetStateAction<boolean>>
  isDisplayAll: boolean
  setIsDisplayAll: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: 'max-content',
      display: 'flow-root',
      fontFamily: 'PremierSans',
    },
    label: {
      margin: theme.spacing(1),
    },
  })
)

const OPTIONS = ['LUOT DI', 'LUOT VE']

export const LegSelect = (props: LegSelectProps) => {
  const { isFirstLeg, setIsFirstLeg, isDisplayAll, setIsDisplayAll } = props
  const classes = useStyles()

  const handleSelectChange = (
    event: SelectChangeEvent<string>
  ) => {
    setIsFirstLeg(event.target.value === OPTIONS[0])
  }

  const handleCheckboxChange = () => {
    setIsDisplayAll(!isDisplayAll)
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Typography
        align="left"
        display="inline"
        variant="subtitle1"
        className={classes.label}
      >
        SELECT PHASE
      </Typography>
      <Select
        native
        value={isFirstLeg ? OPTIONS[0] : OPTIONS[1]}
        onChange={handleSelectChange}
        inputProps={{
          id: 'outlined-age-native-simple',
        }}
      >
        {OPTIONS.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </Select>
      <Typography
          align="left"
          display="inline"
          variant="subtitle1"
          className={classes.label}
        >
          DISPLAY ALL
        </Typography>
        <Switch
          color="primary"
          checked={isDisplayAll}
          onChange={handleCheckboxChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
    </FormControl>
  )
}

export default LegSelect
