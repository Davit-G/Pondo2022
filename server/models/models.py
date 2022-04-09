from pydantic import BaseModel
class Vote(BaseModel):
    worse_politician_id: str
    better_politician_id: str
