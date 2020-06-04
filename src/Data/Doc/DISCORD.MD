# **Commands**

---

Ping command to know which bot is connected :

```html
!who
```

![Ping bots](./ping.png)

# **Talk with the bots**

---

Use this structure to talk with a bot :

```html
<botName> <message>
```
Example :

```html
Ally hello
```

![Say hello](./hello.png)

# **Ask bot which script it use**

---

In each .rive script there is a command to know which script is used :

```html
<botName> script <n>
```
* n an integer 

In this example, Steve doesn't recognize the script 2 but Ally does :

![Know used scripts](./script.png)

# **Tell them informations about you, they save them**

---

Robots are able to record information about the user. This information is internal and therefore transmitted from one mouth to another.

We can tell some information about us and ask bots to reply what they know about us. Each user has their own storage space.

![Saved informations](./save.png)

These informations can be find throught the web mouth with the url : 
```
/api/bot/:id/data
```

![Cross mouths](./cross.png)