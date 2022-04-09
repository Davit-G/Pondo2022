from pydantic import BaseModel
class Vote(BaseModel):
    worse_politician_id: int
    better_politician_id: int
