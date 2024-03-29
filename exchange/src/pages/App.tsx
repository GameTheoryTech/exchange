import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Language } from '@gametheory/uikit'
import VersionBar from 'components/VersionBar'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './AddLiquidity/redirects'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import AddLiquidity from './AddLiquidity'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import Swap from './Swap'
import Migration from './Migration'
import Farms from './Farms'
import Redeem from './Redeem'
import Bonds from './Bonds'
import Altergene from './Altergene'
import AltergeneClaim from './AltergeneClaim'
import Home from './Home'
import Play from './Play'
import About from './About'
import Rewards from './Rewards'
import { RedirectPathToSwapOnly } from './Swap/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import Footer from '../components/Footer';

import Menu from '../components/Menu'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
  background-image: linear-gradient(135deg, rgb(23, 33, 55) 0%, rgb(22, 33, 54) 60%, rgb(10, 16, 28) 100%);
  background-color: rgb(23, 33, 55);
  overflow: hidden;
`

const BodyWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  margin-bottom: 58px;
`

const CACHE_KEY = 'pancakeSwapLanguage'

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    const storedLangCode = localStorage.getItem(CACHE_KEY)
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  const handleLanguageSelect = (langObject: Language) => {
    setSelectedLanguage(langObject)
    localStorage.setItem(CACHE_KEY, langObject.code)
  }

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <LanguageContext.Provider
            value={{
              selectedLanguage,
              setSelectedLanguage: handleLanguageSelect,
              translatedLanguage,
              setTranslatedLanguage,
            }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <Menu>
                <BodyWrapper>
                  <Popups />
                  <Web3ReactManager>
                    <Switch>
                      <Route exact strict path="/play" component={Play} />
                      <Route exact strict path="/swap" component={Swap} />
                      <Route exact strict path="/find" component={PoolFinder} />
                      <Route exact strict path="/pool" component={Pool} />
                      <Route exact path="/add" component={AddLiquidity} />
                      <Route exact path="/migrate" component={Migration} />
                      <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                      <Route exact strict path="/farms" component={Farms} />
                      <Route exact strict path="/redeem" component={Redeem} />
                      <Route exact strict path="/rewards" component={Rewards} />
                      <Route exact strict path="/bonds" component={Bonds} />
                      <Route exact strict path="/altergene" component={Altergene} />
                      <Route exact strict path="/alterClaim" component={AltergeneClaim} />

                      <Route exact strict path="/about" component={About} />

                      {/* Redirection: These old routes are still used in the code base */}
                      <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                      <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                      <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />

                      <Route exact strict path="/" component={Home} />
                    </Switch>
                  </Web3ReactManager>
                </BodyWrapper>
              </Menu>
              <Footer />
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
