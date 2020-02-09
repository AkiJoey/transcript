# -*- coding=utf-8 -*-
import requests
from time import time
from lxml import etree
from crawler.hex2b64 import HB64
from crawler.RSAJS import RSAKey

class Login():
	def __init__(self, username, password, year, term):	# 初始化数据
		self.session = requests.Session()
		self.username = username
		self.password = password
		self.year = year
		self.term = str(term * term * 3)
		self.timestamp = str(time() * 1000)
		self.url_key = "http://jwsys.gdpu.edu.cn/xtgl/login_getPublicKey.html?time="	# 获取公钥参数的 url
		self.url_login = "http://jwsys.gdpu.edu.cn/xtgl/login_slogin.html?language=zh_CN&_t="	# 登录主页的 url
		self.url_grade = "http://jwsys.gdpu.edu.cn/cjcx/cjcx_cxDgXscj.html?doType=query&gnmkdm=N305005"	# 查询成绩的 url

	def getCsrfToken(self):	# 获取 csrftoken
		response = self.session.get(self.url_login + self.timestamp)
		lxml = etree.HTML(response.content.decode("utf-8"))
		self.csrftoken = lxml.xpath("//input[@id='csrftoken']/@value")[0]

	def getPublicKey(self):	# 获取公钥参数
		response = self.session.get(self.url_key + self.timestamp).json()
		self.modulus = response["modulus"]
		self.exponent = response["exponent"]

	def getEnPassword(self):	# 生成公钥进行加密
		rsaKey = RSAKey()
		rsaKey.setPublic(HB64().b642hex(self.modulus), HB64().b642hex(self.exponent))
		self.enPassword = HB64().hex2b64(rsaKey.encrypt(self.password))

	def loginHome(self):	# 登录主页
		self.getCsrfToken()
		self.getPublicKey()
		self.getEnPassword()
		data = [("csrftoken", self.csrftoken), ("yhm", self.username), ("mm", self.enPassword), ("mm", self.enPassword)]
		response = self.session.post(self.url_login + self.timestamp, data = data)

	def getGrade(self):	# 获取成绩
		self.loginHome()
		data = [("xnm", self.year), ("xqm", self.term), ("_search", "false"), ("nd", self.timestamp), ("queryModel.showCount", "15"), ("queryModel.currentPage", "1"), ("queryModel.sortName", ""), ("queryModel.sortOrder", "asc"), ("time", "0")]
		response = self.session.post(self.url_grade, data = data).json()
		return response