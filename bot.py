import discord as dc
import os
import logging
import chat
from dotenv import load_dotenv
from discord.ext import commands


#logger
logger = logging.getLogger('discord')
logger.setLevel(logging.DEBUG)
handler = logging.FileHandler(filename='discord.log', encoding='utf-8', mode='w')
handler.setFormatter(logging.Formatter('%(asctime)s:%(levelname)s:%(name)s: %(message)s'))
logger.addHandler(handler)


#import token from env
load_dotenv(dotenv_path=".env")
token = os.getenv("token")


intents = dc.Intents.all()
intents.members = True

#init discord bot login
bot = commands.Bot(command_prefix=',', intents=intents)



@bot.event
async def on_ready():
        print(f"""
        ---
        Connected to discord:
        -> Bot: {bot.user}
        -> ID: {bot.user.id}
        -> In Servers: {len(bot.guilds)}
        """)

""" echo
    ---
    just a test command for .ext commands
    """
@bot.command()
async def echo(ctx, *args):
    await ctx.send(' '.join(args))

""" re
    ---
    An auto reply command using gpt-3
    """
@bot.command()
async def re(ctx, *args):
    ques = ' '.join(args).strip()
    await ctx.send(chat.talk(ques))

""" ask
    ---
    Answer a Question using gpt-3
    """
@bot.command()
async def ask(ctx, *args):
    ques = ' '.join(args).strip()
    await ctx.send(chat.query(ques))

bot.run(token)