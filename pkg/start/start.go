package start

import (
	"fmt"

	"github.com/UWindsorCSS/hub/pkg/config"
)

func Run() {
	_, err := config.Load("config.hcl")
	if err != nil {
		fmt.Printf("FUCK: %s\n", err)
		return
	}
	fmt.Printf("Hi\n")
}
