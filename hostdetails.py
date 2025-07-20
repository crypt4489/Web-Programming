import psutil
import platform
import os
import cpuinfo
import GPUtil

class HostDetails():

    def __init__(self):
        print("System:", platform.system())
        print("Node Name:", platform.node())
        print("Release:", platform.release())
        print("Version:", platform.version())
        print("Machine:", platform.machine())
        print("Processor:", platform.processor())



        print(cpuinfo.get_cpu_info())

        print("\nCPU Cores (Logical):", psutil.cpu_count())
        print("CPU Cores (Physical):", psutil.cpu_count(logical=False))
        print("CPU Usage:", psutil.cpu_percent(interval=1), "%")

        mem = psutil.virtual_memory()
        print("\nTotal Memory:", round(mem.total / (1024**3), 2), "GB")
        print("Available Memory:", round(mem.available / (1024**3), 2), "GB")
        print("Memory Usage:", mem.percent, "%")
       
        GPUS = GPUtil.getGPUs()
        print(GPUS)
        for gpu in GPUS:
            print(f"GPU {gpu.id} : {gpu.name}, Memory Used : {gpu.memoryUsed}MB / {gpu.memoryTotal}MB")

    
    def GetHostInfo(self) -> dict:
        return {"system": platform.system(), "version": platform.version(), "node": platform.node()}
        

if __name__ == "__main__":
    h = HostDetails()
    print("jello")
else:
    print("hello")
