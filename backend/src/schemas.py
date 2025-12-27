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

class OrderStatus(str,Enum):
    pending = "pending"
    preparing = "preparing"
    ready = "ready"
    completed = "completed"

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



class FoodMenu(Food):
    image : str
    prepTime : int
    stock : int

class FoodResponse(FoodMenu):
    id : int
class FoodOrder(BaseModel):
    menuItem : FoodResponse
    quantity : int

class OrderReq(BaseModel):
    pickupTime : str
    totalPrice : int
    items : List[FoodOrder]
    status : OrderStatus
    isGroupOrder : bool
    groupMembers: Optional[List[str]] = None

class OrderResponse(OrderReq):
    id: int
    token: str
    orderTime: datetime
