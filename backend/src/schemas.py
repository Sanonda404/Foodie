from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime, time
from enum import Enum


# --- Req Schemas ---

from typing import List, Optional

class FoodCatagries(str, Enum):
    MainCourse = "MainCourse"
    Snacks = "Snacks"
    Beverages = "Beverages"
    Desserts = "Desserts"

class OrderStatus(Enum):
    pending = "pending"
    preparing = "preparaing"
    ready = "ready"

class StudentSignUpReq(BaseModel):
    studentId: str
    password: str

class StudentLogInReq(BaseModel):
    studentId : str
    password : str

class CanteenLogInReq(BaseModel):
    password: str

class Food(BaseModel):
    name : str
    description : str
    category : FoodCatagries
    price : int
    available : bool

class FoodOrder(Food):
    food_id : int
    quantity : int

class FoodMenu(Food):
    image : str
    prepTime : int
    stock : int

class FoodResponse(FoodMenu):
    id : int

class OrderReq(BaseModel):
    studentId : str
    pickupTime : str
    totalPrice : int
    foods : List[FoodOrder]
    status : OrderStatus
    isGroupOrder : bool
    groupMembers: List[str];

