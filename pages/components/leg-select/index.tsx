import {
  createStyles,
  FormControl,
  makeStyles,
  Select,
  Theme,
  Typography,
} from '@material-ui/core'
import React from 'react'

interface LegSelectProps {
  isFirstLeg: boolean
  setIsFirstLeg: React.Dispatch<React.SetStateAction<boolean>>
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
  const { isFirstLeg, setIsFirstLeg } = props
  const classes = useStyles()

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setIsFirstLeg(event.target.value === OPTIONS[0])
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
        onChange={handleChange}
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
    </FormControl>
  )
}

export default LegSelect
