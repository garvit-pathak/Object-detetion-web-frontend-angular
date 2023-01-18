export interface CategoryField {
  title: string;
  description: string;
  icon: string;
  slug:string;
  category: string;
}

export const FaqCategory: CategoryField[] = [
  { title: 'Billing/ Subscription', description: 'Details of billing, subscription and pricing', icon: 'credit_card',slug:'billing-subscription',category:'S' },
  { title: 'User account', description: 'Details of billing, subscription and pricing', icon: 'person',slug:'user-account',category:'U' },
  { title: 'Project ', description: 'New to Xtract, Get started here', icon: 'credit_card' ,slug:'project',category:'P'},
  { title: 'Recently added', description: 'Details of billing, subscription and pricing', icon: 'credit_card',slug:'recently-added',category:'R' },
]
