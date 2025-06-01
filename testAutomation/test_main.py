import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
import requests
import time
import pytest
import os
import random


# https://dev.to/victordalet/selenium-python-and-docker-2852
# https://pytest-with-eric.com/automation/pytest-selenium/
class App:
    options: uc.ChromeOptions
    driver: uc.Chrome

    def __init__(self):
        print("INITIALIZING APP")
        load_dotenv()
        self.resolve_urls()
        print("Pocketbase url", self.pocketbase_url)
        print("Frontend url", self.frontend_url)
        self.options = uc.ChromeOptions()
        self.options.arguments.extend(["--no-sandbox", "--disable-setuid-sandbox"])
        self.driver = uc.Chrome(headless=True, use_subprocess=False)
        self.timeout = 5


    def resolve_urls(self):
        is_deployment_docker = os.getenv('deployment', None)
        if is_deployment_docker is not None:  # use Docker DNS resolver
            self.pocketbase_url = "http://next-pocketbase:8090"
            self.frontend_url = "http://next-frontend:3000"
        else:
            self.pocketbase_url = "http://localhost:8096"
            self.frontend_url = "http://localhost:3006"

    def wait_serices_up(self):
        print("Wait until services up")
        attempts = 25
        services = [f"{self.pocketbase_url}/api/health", self.frontend_url]
        for service in services:
            for attempt in range(attempts):
                try:
                    response = requests.get(service, timeout=self.timeout)
                    if response.status_code == 200:
                        print(f"service: {service} is healthy")
                        break
                    else:
                        print(f"Retry... {attempt}. Service: {service} returned code: {response.status_code}")
                        time.sleep(5)
                except Exception:
                    print(f"Connection error {attempt}, retrying...")
                    time.sleep(5)
            else:
                print(f"Service {service} is not up after {attempts} attempts")
                raise Exception(f"Service {service} is not up after {attempts} attempts")
        print("Services up...")


@pytest.fixture
def app():
    app = App()
    app.wait_serices_up()
    return app

def test_register(app: App):
    print("Start test_register")