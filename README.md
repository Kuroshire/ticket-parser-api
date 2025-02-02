This is a mini project realised to help simplify and contain the logic used to retrieve elements bought in grocery stores.
This project uses Tesseract to read data from a given document, whether it is a picture taken from your phone, or a downloaded grocery ticket from a third party API.
Note that the picture taken option can be really buggy for the moment, it is highly recommanded to use a downloaded file from the store website or API if you want accurate results.

Everything you need to know to use this API:

Routes:

/upload-receipt : returns a stringified version of the file given in entry. Body: receipt (a file, required)