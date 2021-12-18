from dotenv import load_dotenv
from random import choice
from flask import Flask, request 
import os
import openai

load_dotenv()
openai.api_key = os.getenv("api")

def talk(question):
    print("Promt Text : ",question)
    response = openai.Completion.create(
      engine="davinci-instruct-beta-v3",
      prompt=question,
      temperature=0.9,
      max_tokens=150,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0.6,
    )
    reply = response.choices[0].text
    return str(reply)


def query(question):
    print("Promt Text : ",question)
    response = openai.Completion.create(
      engine="davinci-instruct-beta-v3",
      prompt=question,
      temperature=0,
      max_tokens=100,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0,
    )
    reply = response.choices[0].text
    return str(reply)
