import sys
import numpy as np
import matplotlib.pyplot as plt 
from scipy import stats

x = np.array([1.5,2,2.5,3,3.5,4,4.5,5,5.5,6])
y = np.array([10.35,12.3,13,14.0,16,17,18.2,20,20.7,22.5])
slope, intercept, r_value, p_value, std_err = stats.linregress(x,y)
mn=np.min(x)
mx=np.max(x)

y1=slope*mn+intercept
y2=slope*mx + intercept
results = {
    'x1': mn ,
    'y1': y1,
    'x2': mx,
    'y2':y2 
}
print(str('STRING'))
sys.stdout.flush()