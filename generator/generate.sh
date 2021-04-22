#! /bin/bash

gen_1=`node generator.js 290 users_290.json`
echo "${gen_1}"

gen_2=`node generator.js 580 users_580.json`
echo "${gen_2}"

gen_3=`node generator.js 1175 users_1175.json`
echo "${gen_3}"

gen_4=`node generator.js 2350 users_2350.json`
echo "${gen_4}"

gen_5=`node generator.js 4700 users_4700.json`
echo "${gen_5}"

gen_6=`node generator.js 9375 users_9375.json`
echo "${gen_6}"

gen_7=`node generator.js 18750 users_18750.json`
echo "${gen_7}"

gen_8=`node generator.js 37500 users_37500.json`
echo "${gen_8}"

gen_9=`node generator.js 75000 users_75000.json`
echo "${gen_9}"

gen_10=`node generator.js 150000 users_150000.json`
echo "${gen_10}"

gen_11=`node generator.js 300000 users_300000.json`
echo "${gen_11}"

echo "Генерация завершена. Выборки соответвующих размеров помещены в ../data/"

