import sys, json
from dotenv import load_dotenv
from random import choice
from flask import Flask, request 
import os
import openai

openai.api_key = os.getenv("api")

def talk(question):
    response = openai.Completion.create(
      engine="davinci-instruct-beta-v3",
      prompt=question,
      temperature=0.5,
      max_tokens=150,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0.6,
    )
    reply = response.choices[0].text
    return str(reply)


def ask(question):
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

# ---------------------------------------------------------
def main():
    data = sys.argv
    data.pop(0)
    lastarg = data[-1]
    query = " ".join(data)
    if(lastarg[-1] == '?'):
        print(ask(query))
    else:
        print(talk(query))
    

#start process
if __name__ == '__main__':
    main()