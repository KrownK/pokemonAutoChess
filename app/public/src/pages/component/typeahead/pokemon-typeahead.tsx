import React from "react"
import { Typeahead } from "react-bootstrap-typeahead"

import { TypeaheadProps } from "./types"

import { useTranslation } from "react-i18next"
import { Pkm } from "../../../../../types/enum/Pokemon"
import "./pokemon-typeahead.css"

export function PokemonTypeahead({ onChange, value }: TypeaheadProps<Pkm>) {
  const pokemonOptions = Object.values(Pkm)
  const { t } = useTranslation()

  return (
    <Typeahead
      id="pokemon-typeahead"
      className="pokemon-typeahead"
      defaultInputValue={value}
      options={pokemonOptions}
      placeholder={t("select_pokemon")}
      onChange={(option) => {
        const val = option[0] as Pkm
        onChange(val)
      }}
    />
  )
}
