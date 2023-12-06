package middleware

func TokenGenerator(model ...interface{}) (token string, refreshToken string, err error) {
	return "", "", nil
}

func UpdateAllTokens(token, refreshToken, userID string) {}
