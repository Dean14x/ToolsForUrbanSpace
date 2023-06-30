

class CatalogItem {
  constructor(id, name="Unnamed Item", category="Other", cost=0.0, monthlyCost=0.0, description="", amount=0) {
    this.id = id
    this.name = name
    this.category = category
    this.description = description
    this.amount = amount
    this.cost = cost
    this.monthlyCost = monthlyCost

  }


  print() {
    console.log(`${this.name} :: ${this.price}`)
  }
}

export default CatalogItem