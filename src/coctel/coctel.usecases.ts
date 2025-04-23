import BloodyMary from 'images/bloody-mary-coctel.jpeg'
import MoscowMule from 'images/moscow-mule.jpeg'
import ScrewDiver from 'images/screwdiver.jpg'
import SexOnTheBeach from 'images/sex-on-the-beach.jpg'
import Cosmopolitan from 'images/cosmopolitan.jpeg'
import ExpressoMartini from 'images/expresso-martini.jpeg'
import SmashPineaple from 'images/smash-pineaple.jpeg'
import AppleMartini from 'images/apple-martini.jpeg'
import PinkGinTonic from 'images/pink-gin-tonic.jpeg'
import type { CoctelAliases } from './coctel.domain'

export const getCocktailImg = (cocktail: CoctelAliases) => {
  const cocktails = {
    ['bloody-mary']: BloodyMary,
    ['moscow-mule']: MoscowMule,
    ['screwdiver']: ScrewDiver,
    ['sex-on-the-beach']: SexOnTheBeach,
    ['cosmopolitan']: Cosmopolitan,
    ['expresso-martini']: ExpressoMartini,
    ['smash-pineaple']: SmashPineaple,
    ['apple-martini']: AppleMartini,
    ['pink-gin-tonic']: PinkGinTonic,
  } as Record<CoctelAliases, ImageMetadata>

  return cocktails[cocktail]
}
