timeout=60 # wait maximum 60 seconds
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:6006)" != "200" && $timeout -gt 0 ]]; do
	sleep 1
	((timeout--))
done