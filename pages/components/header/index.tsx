import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import FplLogo from '../../../public/fpl-logo.svg'
import { HELPERS } from '../../../helpers'
import Image from 'next/image'

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
    joinDiv: {
      right: 50,
      position: "absolute",
    },
    joinButton: {
      marginBottom: 3,
      width: 10,
      "&:hover": {
        backgroundColor: "#04FF86",
        borderColor: "#00FE8D",
      }
    },
  })
)
const styles = {
  bannerBarStyle: {
    backgroundImage: `url(${'pattern-2-d.0a64c7c7.png'}), url(${'pattern-2-d.0a64c7c7.png'}), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))`,
    backgroundPosition: '50%, right -3px bottom -24px, 0px center',
    backgroundSize: '618px 873px, 618px 873px, auto',
  },
  bgImageStyle: {
    margin: 'auto',
    height: '100%',
    width: '100%',
    maxWidth: 1200,
    // backgroundImage: `url(${'player-comp-4-1x.966f0e57.png'})`,
    backgroundImage: `url(${'player-comp-1-1x.83b3963d.png'})`,
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
            TOMO FC 2024-2025
          </Typography>
          <div className={classes.joinDiv}>
            <div>
              {/* <Button variant="outlined" color="primary" href={HELPERS.CONFIG.JOIN_LEAGUGE_URL} className={classes.joinButton}>
                TOMO
              </Button> */}
              <Image src="/JP.gif" width={60} height={42} />
            </div>
            {/* <div>
              <Button variant="outlined" color="primary" href={HELPERS.CONFIG.JOIN_H2H_URL} className={classes.joinButton}>
                H2H
              </Button>
            </div> */}
          </div>
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
