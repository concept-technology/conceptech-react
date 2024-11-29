 export interface cardItems {
  Name: string;
  Description: string;
  link: string
}


const projecObject: cardItems[]=[
    {
    Name: "Game-hub",
    Description: "fetch latest games from the Rawg Api", link: '/gamehub'
},
{Name: "Expense tracker", Description: "keep track of your daily expenses", link: "/expenseTracker"}
]
export default projecObject