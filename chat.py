import sys, json
from dotenv import load_dotenv
from random import choice
from flask import Flask, request 
import os
import openai

openai.api_key = os.getenv("api")

def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def talk(question):
    response = openai.Completion.create(
      engine="davinci-instruct-beta-v3",
      prompt=question,
      temperature=0.7,
      max_tokens=150,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0.6,
    )
    reply = response.choices[0].text
    return str(reply)

def main():
    lines = read_in()
    out = talk(lines)
    #return the sum to the output stream
    print(out)

#start process
if __name__ == '__main__':
    main()