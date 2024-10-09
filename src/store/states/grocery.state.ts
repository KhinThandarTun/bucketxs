import { Injectable } from "@angular/core";
import { createSelector, Selector, State } from "@ngxs/store";
import { Grocery } from "../../models/grocery.model";

interface GroceryStateModel{
    groceries: Grocery[];
}
// Define the State
@State<GroceryStateModel>({
    name: 'grocery',
    defaults: {
        groceries: [
            { id: 1, name: "Apple", type: "fruit" },
            { id: 2, name: "Banana", type: "fruit" },
            { id: 3, name: "lays chips", type: "snacks" },
            { id: 4, name: "doritos", type: "snacks" },
        ]
    }
  })

  @Injectable()
  export class GroceryState{
    @Selector()
    static getAllGroceries(state: GroceryStateModel){
        console.log("getAllGroceries called");
        return state.groceries;
    }

    static getGroceriesByType(type: string) {
        return createSelector([GroceryState], (state: GroceryStateModel) => {
            return state.groceries.filter(item => item.type == type)
        });
    }
  }

  GroceryState