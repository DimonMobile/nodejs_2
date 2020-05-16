openssl genrsa -des3 -out CA.key 2048
openssl req -x509 -new -key CA.key -days 700 -sha256 -out CA.crt
openssl genrsa -out LAB.key 2048
openssl req -new -key lab.key -out lab.csr -sha256 -config lab.cfg
openssl x509 -req -in lab.csr -CA CA.crt -CAkey CA.key -CAcreateserial -out LAB.crt -days 365 -sha256 -extensions v3_req -extfile lab.cfg
certmgr.msc
; hosts at C:\Windows\System32\drivers\etc