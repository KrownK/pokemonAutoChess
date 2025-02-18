import React from "react"
import { useTranslation } from "react-i18next"
import {
  getPokemonData,
  PRECOMPUTED_POKEMONS_PER_TYPE_AND_CATEGORY
} from "../../../../../models/precomputed"
import {
  RarityColor,
  RarityCost,
  SynergyTriggers
} from "../../../../../types/Config"
import { Pkm, PkmFamily } from "../../../../../types/enum/Pokemon"
import { Synergy, SynergyEffects } from "../../../../../types/enum/Synergy"
import { IPokemonData } from "../../../../../types/interfaces/PokemonData"
import { useAppSelector } from "../../../hooks"
import { getPortraitSrc } from "../../../utils"
import { addIconsToDescription } from "../../utils/descriptions"
import { cc } from "../../utils/jsx"
import SynergyIcon from "../icons/synergy-icon"
import { EffectDescriptionComponent } from "./effect-description"

export default function SynergyDetailComponent(props: {
  type: Synergy
  value: number
}) {
  const { t } = useTranslation()
  const additionalPokemons = useAppSelector(
    (state) => state.game.additionalPokemons
  )
  if (SynergyTriggers.hasOwnProperty(props.type) === false) return null
  const levelReached = SynergyTriggers[props.type]
    .filter((n) => n <= props.value)
    .at(-1)

  const regulars = PRECOMPUTED_POKEMONS_PER_TYPE_AND_CATEGORY[
    props.type
  ].pokemons
    .filter(
      (p, i, arr) => arr.findIndex((x) => PkmFamily[x] === PkmFamily[p]) === i // remove duplicates of same family
    )
    .map((p) => getPokemonData(p as Pkm))
    .sort((a, b) => RarityCost[a.rarity] - RarityCost[b.rarity])

  const additionals = PRECOMPUTED_POKEMONS_PER_TYPE_AND_CATEGORY[
    props.type
  ].additionalPokemons
    .filter((p) => additionalPokemons.includes(PkmFamily[p]))
    .filter(
      (p, i, arr) => arr.findIndex((x) => PkmFamily[x] === PkmFamily[p]) === i // remove duplicates of same family
    )
    .map((p) => getPokemonData(p as Pkm))

  const uniques = PRECOMPUTED_POKEMONS_PER_TYPE_AND_CATEGORY[
    props.type
  ].uniquePokemons
    .filter(
      (p, i, arr) => arr.findIndex((x) => PkmFamily[x] === PkmFamily[p]) === i // remove duplicates of same family
    )
    .map((p) => getPokemonData(p as Pkm))

  const legendaries = PRECOMPUTED_POKEMONS_PER_TYPE_AND_CATEGORY[
    props.type
  ].legendaryPokemons
    .filter(
      (p, i, arr) => arr.findIndex((x) => PkmFamily[x] === PkmFamily[p]) === i // remove duplicates of same family
    )
    .map((p) => getPokemonData(p as Pkm))

  return (
    <div style={{ maxWidth: "480px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <SynergyIcon type={props.type} size="40px" />
        <h3 style={{ margin: 0 }}>{t(`synergy.${props.type}`)}</h3>
      </div>
      <p>{addIconsToDescription(t(`synergy_description.${props.type}`))}</p>

      {SynergyEffects[props.type].map((d, i) => {
        return (
          <div
            key={d}
            style={{
              color:
                levelReached === SynergyTriggers[props.type][i]
                  ? "#fff"
                  : "#e8e8e8",
              backgroundColor:
                levelReached === SynergyTriggers[props.type][i]
                  ? "#54596b"
                  : "rgba(84, 89, 107,0)",
              border:
                levelReached === SynergyTriggers[props.type][i]
                  ? "4px solid black"
                  : "none",
              borderRadius: "12px",
              padding: "5px"
            }}
          >
            <h4 style={{ fontSize: "1.2em" }}>
              ({SynergyTriggers[props.type][i]}) {t(`effect.${d}`)}
            </h4>
            <EffectDescriptionComponent effect={d} />
          </div>
        )
      })}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {regulars.map((p) => (
          <PokemonPortrait p={p} key={p.name} />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {additionals.map((p) => (
          <PokemonPortrait p={p} key={p.name} />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {uniques.map((p) => (
          <PokemonPortrait p={p} key={p.name} />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {legendaries.map((p) => (
          <PokemonPortrait p={p} key={p.name} />
        ))}
      </div>
    </div>
  )
}
function PokemonPortrait(props: { p: IPokemonData }) {
  return (
    <div
      className={cc("pokemon-portrait", {
        additional: props.p.additional
      })}
      key={props.p.name}
    >
      <img
        style={{ border: "3px solid " + RarityColor[props.p.rarity] }}
        src={getPortraitSrc(props.p.index)}
      />
    </div>
  )
}
