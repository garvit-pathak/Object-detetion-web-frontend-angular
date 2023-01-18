
export class CartItem {
  plan: any;
  quantity: number
  effectiveFrom?:Date

  constructor(plan: any, quantity: number,effectiveFrom=null) {
    this.plan = plan;
    this.quantity = quantity;
    this.effectiveFrom =  effectiveFrom ? effectiveFrom : new Date()
  }

  public get total(): number {
    return this.plan.price * this.quantity
  }
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
export class ShoppingCart {

  plans: CartItem[]
  basePlanAdded = false
  private _group:any
  addressId:number;

  public get total(): number {
    return this.plans.reduce((sum, item) => sum += item.total, 0)
  }
  constructor() {
    this.plans = []
  }

  public set group(v : any) {
    this._group = v;
  }

  public get group() : any {
    return this._group
  }
  removePlan(index){
    this.plans.splice(index,1)

  }
  increaseQuantity(planId){
    let index = this.getPlanIndex(planId)
    if(!index){return;}
    this.plans[index].quantity++
  }
  decreaseQuantity(planId){
    let index = this.getPlanIndex(planId)
    if(!index){return;}
    this.plans[index].quantity--
    if(!this.plans[index].quantity){

      this.removePlan(index)
    }
  }
  private getPlanIndex(planId){
    return  this.plans.findIndex(({ plan }) => plan.id === planId);
  }
  setEffectiveFrom(date:Date,planId:number=null){
    let index;
    if(!planId){
    index =  this.plans.findIndex(({ plan }) => plan.plan_type === 'BP');


      if(index === -1){


        return
      }
    }
    else{
    index =  this.plans.findIndex(({ plan }) => plan.id === planId);

    }
    this.plans[index].effectiveFrom = date
  }
  addToCart(item,effectiveFrom=null) {
    if (item.plan_type === 'BP' && this.basePlanAdded) {
      return
    }
    const productExistInCart = this.plans.find(({ plan }) => plan.id === item.id); // find product by id

    if (!productExistInCart) {
      if (item.plan_type === 'BP') {
        this.basePlanAdded = true
      this.plans.push(new CartItem(item, 1,effectiveFrom));

      }
      else{
        this.plans.push(new CartItem(item, 1));

      }
      return;
    }
    productExistInCart.quantity += 1;



  }

  removeFromCart(item: any): void {
    this.plans = this.plans.filter(({ plan }) => plan.id !== item.id)
    if(item.plan_type === 'BP'){
      this.basePlanAdded = false
    }


  }

  public get totalItem() : number {
    return this.plans.length
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    this.plans = [];
    input.plans.forEach(element => {
      this.plans.push(new CartItem(element.plan,element.quantity));
    });
    return this;
  }


}
