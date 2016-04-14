toc = require('markdown-toc')
fs = require "fs"
filter = (str,ele,arr) ->
  ele.content = ele.content.replace(/ <sup>.*<\/sup>/,"")
  return true
slugify = (str) ->
  return str.toLowerCase()
    .replace(/\s/g,"-")
    .replace(/<sup>/g,"")
    .replace(/<\/sup>/g,"")
    .replace(/[\[\]\^]/g,"")
    .replace(/\(.*\)/,"")
fs.readFile "./README.md", {encoding:"utf8"}, (err,data) ->
  throw err if err
  toc = toc.insert(data,maxdepth:3,filter:filter,slugify:slugify)
  #data.replace(/<!-- toc -->[\w\d\s]*<!-- tocstop -->/,"<!-- toc -->\n"+toc+"\n<!-- tocstop -->/")
  if toc
    fs.writeFile "./README.md",toc,(err) ->
      throw err if err
  else
    throw new Error "creating toc failed"
