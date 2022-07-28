import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import FplLogo from '../../../public/fpl-logo.svg'
import { HELPERS } from '../../../helpers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      width: '100%',
    },
    banner: {
      height: 56,
      width: 300,
      backgroundImage: `url(${'header-bg.svg'})`,
    },
    svglogo: {
      width: 200,
      height: 100,
      transform: 'scale(2)',
    },
    title: {
      padding: '5.5rem 2rem',
      color: theme.palette.background.default,
    },
    joinButton: {
      right: 50,
      position: "absolute",
      // backgroundColor: "#04FF86",
      "&:hover": {
        backgroundColor: "#04FF86",
        borderColor: "#00FE8D",
      }
    },
  })
)

const styles = {
  bannerBarStyle: {
    display: 'block',
    height: 250,
    width: '100%',
    backgroundColor: '#37003C',
    backgroundImage: `url(${'header-bg-d.svg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '100% 100%',
  },
  bgImageStyle: {
    margin: 'auto',
    height: '100%',
    width: '100%',
    maxWidth: 1200,
    backgroundImage: `url(${'player-comp.png'})`,
    backgroundSize: '360px 240px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 2rem bottom',
  },
}

export const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <FplLogo className={classes.svglogo} />
          <Typography variant="h6" color="primary">
            TOMO FC 2022-2023
          </Typography>
            <Button variant="outlined" color="primary" href={HELPERS.CONFIG.JOIN_LEAGUGE_URL} className={classes.joinButton}>
              lzb0ck
            </Button>
        </Toolbar>
      </AppBar>
      <div style={styles.bannerBarStyle}>
        <div style={styles.bgImageStyle}>
          <Typography variant="h2" className={classes.title}>
            TOMO FC
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Header
