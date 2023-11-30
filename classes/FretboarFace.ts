class FretboardFace {
  private fbRatio = 0.6

  public width = window.innerWidth * this.fbRatio
  public height = 250
  public fretdotSize = 20
  public selectedWidth = 5
  public stringHeight = 4
  public fontSize = 14
  public toneRoundness = 50
  public toneSize = 30
  public fretDistances: Array<Number> = []

}