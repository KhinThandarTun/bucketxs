import { Injectable } from "@angular/core";
import { Action, createSelector, Selector, State, StateContext } from "@ngxs/store";
import { Bucket } from "../models/bucket.model";
import { AddToBucket, RemoveFromBucket } from "./actions/bucket.actions";

interface BucketStateModel{
    myBucket: Bucket[];
}
// Define the State
@State<any>({
    name: 'bucket',
    defaults: {
        bucketTotalPrice:100,
        myBucket: []
    }
  })

  @Injectable()
  export class BucketState{
    @Selector()
    static getMyBucket(state: BucketStateModel){
        console.log("getAllGroceries called");
        return state.myBucket;
    }

    @Action(AddToBucket)
    addToBucket(ctx: StateContext<BucketStateModel>, action: AddToBucket){
        const state = ctx.getState();
        const bucketItem = state.myBucket.find(item => item.id === action.payload.id);
        if(bucketItem){
            ctx.patchState({
               myBucket:state.myBucket.map(item=>{
                   return item.id === action.payload.id
                    ? {...item,quantity:item.quantity + action.payload.quantity} 
                    : item
               })
            })
         }else{
             ctx.patchState({
                   myBucket:[
                       ...state.myBucket,
                       action.payload
                   ]
               })
         }
    }

    @Action(RemoveFromBucket)
    removeFromBucket(ctx: StateContext<BucketStateModel>, action: RemoveFromBucket){
        const state = ctx.getState();
        const existingItem = state.myBucket.find(item => item.id === action.payload.id);
        if(existingItem && existingItem.quantity > 1){
            ctx.patchState({
               myBucket:state.myBucket.map(item=>{
                   return item.id === action.payload.id
                    ? {...item,quantity:item.quantity - 1} 
                    : item
               })
            })
         }else{
             ctx.patchState({
                   myBucket: state.myBucket.filter(item => item.id !== action.payload.id)
               })
         }
    }
}
