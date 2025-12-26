from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from passlib.context import CryptContext

from src.database import get_db
from src.schemas import StudentSignUpReq, StudentLogInReq, CanteenLogInReq, OrderReq, FoodOrder, FoodMenu, FoodResponse

from src.model import User, Order, FoodItem, OrderItem
import random

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------------
# Sign up & Log In System
# -------------------------

@router.post('/signup')
def signup(payload: StudentSignUpReq, db: Session = Depends(get_db)):
    print(payload)
    user = User(
        studentId = payload.studentId,
        password = payload.password
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def verify_password(plain_password: str, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

@router.post("/login/student")
def login(login_payload: StudentLogInReq, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.studentId ==login_payload.studentId).first()
    if not user:
        raise HTTPException(status_code=404, detail="Student Not Registered")
    if not login_payload.password == user.password:
        raise HTTPException(status_code=404, detail="Incorrect Password")
    return user

@router.post("/login/canteen")
def canteen_login(payload: CanteenLogInReq, db: Session = Depends(get_db)):
    if(payload.password != "ECECanteen123"):
        raise HTTPException(status_code=404, detail="Incorrect Password")

@router.post("/add-food")
def add_food(foodreq: FoodMenu, db: Session = Depends(get_db)):
    food = FoodItem(
        name = foodreq.name,
        description = foodreq.description,
        category = foodreq.category,
        price = foodreq.price,
        available = foodreq.available,
        image = foodreq.image,
        prepTime = foodreq.prepTime
    )
    db.add(food)
    db.commit()
    db.refresh(food)

@router.get("/menu", response_model=list[FoodResponse])
def get_menu(db: Session = Depends(get_db)):
    # Query all food items from the DB
    items = db.query(FoodItem).all()
    print(items)
    return items

@router.put("/menu/{item_id}", response_model=FoodResponse)
def update_food_item(item_id: int, item: FoodMenu, db: Session = Depends(get_db)):
    # Fetch the existing item
    db_item = db.query(FoodItem).filter(FoodItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Food item not found")

    # Update fields (SQLAlchemy ORM attributes)
    db_item.name = getattr(item, "name", db_item.name)
    db_item.description = getattr(item, "description", db_item.description)
    db_item.category = getattr(item, "category", db_item.category)
    db_item.price = getattr(item, "price", db_item.price)
    db_item.available = getattr(item, "available", db_item.available)
    db_item.image = getattr(item, "image", db_item.image)
    db_item.prepTime = getattr(item, "prepTime", db_item.prepTime)
    db_item.stock = getattr(item, "stock", db_item.stock)
    # Commit changes
    db.commit()
    db.refresh(db_item)

    return db_item



@router.post("/order")
def order(orderReq : OrderReq, db: Session = Depends(get_db)):
    token_no = f"A-{random.randint(100, 999)}"
    order = Order(
        user_id = orderReq.studentId,
        token_no = 123,
        pickup_time = orderReq.pickupTime
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    for f in orderReq.foods:
        food = db.query(FoodItem).filter(
            FoodItem.id == f.food_id,
            FoodItem.is_available == True
        ).first()

        if not food:
            raise HTTPException(
                status_code=404,
                detail=f"Food item {f.food_id} not available"
            )

        order_item = OrderItem(
            order_id=order.id,
            food_id=f.food_id,
            quantity=f.quantity
        )

        db.add(order_item)
    db.commit()

    return {
        "message": "Order placed successfully",
        "order_id": order.id,
        "token_no": token_no
    }