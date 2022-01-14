import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Header } from './components/header'
import { HELPERS } from '../helpers'
import { Team } from '../models'
import { ReportTable } from './components/report-table'
import { LegSelect } from './components/leg-select'
// import fs from 'fs'

interface IndexProps {
  teamList: Array<Team>
}

export const Index = (props: IndexProps) => {
  const { teamList } = props
  const currentDate = new Date().getTime()
  const startOf2ndLeg = new Date(HELPERS.CONFIG.START_DATE_OF_2ND_LEG).getTime()
  const [isFirstLeg, setIsFirstLeg] = useState(currentDate <= startOf2ndLeg)
  const [isDisplayAll, setIsDisplayAll] = useState(false);

  useEffect(() => {
    setIsDisplayAll(false)
  }, [isFirstLeg])

  return (
    <div className={styles.container}>
      <Head>
        <title>FPL TOMOFC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/pl-logo.svg" />
      </Head>
      <Header />

      <main className={styles.main}>
        <LegSelect isFirstLeg={isFirstLeg} setIsFirstLeg={setIsFirstLeg} isDisplayAll={isDisplayAll} setIsDisplayAll={setIsDisplayAll}/>
        <ReportTable teamList={teamList} isFirstLeg={isFirstLeg} isDisplayAll={isDisplayAll}/>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export const getServerSideProps = async () => {
  const teamList: Array<Team> = await HELPERS.teamList()

  return {
    props: { teamList: teamList },
  }
}

export default Index
