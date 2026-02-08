from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
import numpy as np
from scipy.integrate import odeint
import pandas as pd
from io import BytesIO
from typing import Optional

# Create FastAPI instance
app = FastAPI(
    docs_url="/docs",              # optional: change if you want
    openapi_url="/openapi.json"
)

# Example test route
@app.get("/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

# Your simulation endpoint – IMPORTANT: change path to "/simulate"
@app.post("/simulate")
async def simulate(
    omega: float = Form(1.0),
    zeta: float = Form(0.05),
    amplitude: float = Form(1.0),
    t_end: float = Form(20.0),
    points: int = Form(1000),
    file: Optional[UploadFile] = File(None)
):
    class SimulationParams(BaseModel):
        omega: float
        zeta: float
        amplitude: float
        t_end: float
        points: int

    params = SimulationParams(
        omega=omega, zeta=zeta, amplitude=amplitude,
        t_end=t_end, points=points
    )
    
    t = np.linspace(0, params.t_end, params.points)
    y0 = [params.amplitude, 0.0]
    
    def damped_oscillator(y, t, omega, zeta):
        return [y[1], -2 * zeta * omega * y[1] - omega**2 * y[0]]

    solution = odeint(damped_oscillator, y0, t, args=(params.omega, params.zeta))
    sim_data = {
        "time": t.tolist(),
        "position": solution[:, 0].tolist()
    }

    if file:
        try:
            contents = await file.read()
            df = pd.read_csv(BytesIO(contents))
            required = {"time", "position"}
            if not required.issubset(df.columns):
                return {"error": f"CSV must contain columns: {required}"}
            exp_data = {
                "time": df["time"].tolist(),
                "position": df["position"].tolist()
            }
            return {"simulation": sim_data, "experimental": exp_data}
        except Exception as e:
            return {"error": f"Failed to parse CSV: {str(e)}"}
    
    return {"simulation": sim_data, "experimental": None}