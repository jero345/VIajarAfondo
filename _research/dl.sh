#!/bin/bash
u="$1"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36"
rel="${u#https://viajarafondo.com/wp-content/uploads/}"
name="$(echo "$rel" | tr '/' '_')"
# prefer the unscaled original when WordPress generated a -scaled copy
if [[ "$u" == *-scaled.* ]]; then
  orig="${u/-scaled./.}"
  oname="${name/-scaled./.}"
  [ -f "raw/$oname" ] && exit 0
  code=$(curl -sL -A "$UA" -w "%{http_code}" -o "raw/$oname" "$orig")
  if [ "$code" = "200" ]; then exit 0; fi
  rm -f "raw/$oname"
fi
[ -f "raw/$name" ] && exit 0
code=$(curl -sL -A "$UA" -w "%{http_code}" -o "raw/$name" "$u")
[ "$code" = "200" ] || { echo "FAIL $code $u"; rm -f "raw/$name"; }
