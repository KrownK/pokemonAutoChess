import { t } from "i18next"
import { GameObjects } from "phaser"
import PokemonFactory from "../../../../models/pokemon-factory"
import { Pkm } from "../../../../types/enum/Pokemon"
import { getGameContainer } from "../../pages/game"
import { transformCoordinate } from "../../pages/utils/utils"

export class SellZone extends GameObjects.Container {
  rectangle: Phaser.GameObjects.Rectangle
  zone: Phaser.GameObjects.Zone
  text: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene) {
    const sellZoneCoord = transformCoordinate(4, 5.5)
    super(scene, sellZoneCoord[0] - 48, sellZoneCoord[1] + 24)

    const sellZone = scene.add.zone(0, 0, 8 * 96, 240)
    sellZone.setRectangleDropZone(8 * 96, 240)
    sellZone.setName("sell-zone")
    this.add(sellZone)

    this.rectangle = scene.add
      .rectangle(
        sellZone.x,
        sellZone.y,
        sellZone.input!.hitArea.width,
        sellZone.input!.hitArea.height,
        0x61738a,
        1
      )
      .setStrokeStyle(2, 0x000000, 1)

    this.add(this.rectangle)
    sellZone.setData({ rectangle: this.rectangle })

    this.text = scene.add.text(0, 0, t("drop_here_to_sell"), {
      fontSize: "35px",
      fontFamily: "brandonGrotesque",
      color: "black",
      align: "center"
    })
    this.text.setOrigin(0.5)
    this.add(this.text)

    this.setVisible(false)
    this.scene.add.existing(this)
  }

  showForPokemon(pkm: Pkm) {
    const price = PokemonFactory.getSellPrice(pkm, getGameContainer().player)
    this.text.setText(
      `${t("drop_here_to_sell")} ${t("for_price_gold", { price })}`
    )
    this.rectangle.setFillStyle(0x61738a)
    this.setVisible(true)
  }

  hide() {
    this.rectangle.setFillStyle(0x61738a)
    this.setVisible(false)
  }
}
