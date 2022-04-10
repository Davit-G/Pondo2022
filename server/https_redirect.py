import uvicorn
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import RedirectResponse

app = FastAPI()

from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
app.add_middleware(HTTPSRedirectMiddleware)
if __name__ == '__main__':
    uvicorn.run('https_redirect:app', port=80, host='0.0.0.0')