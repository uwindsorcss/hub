package config

import (
	"embed"
	"errors"
	"fmt"

	"github.com/knadh/koanf"
	"github.com/knadh/koanf/parsers/hcl"
	"github.com/knadh/koanf/providers/file"
	"github.com/knadh/koanf/providers/fs"
)

// errors
var (
	ErrEmptyPathList = errors.New("empty paths list")
)

//go:generate cp ../../default.hcl default.hcl
//go:embed default.hcl
var eConfigFile embed.FS

// config.Load: load and merge configs
// reads from embedded config first
// then other config files with the
// later ones having highest precidence
func Load(paths ...string) (*koanf.Koanf, error) {
	if len(paths) == 0 {
		return nil, fmt.Errorf("config.Load: %w", ErrEmptyPathList)
	}

	k := koanf.New("/")

	err := k.Load(fs.Provider(eConfigFile, "default.hcl"), hcl.Parser(false))
	if err != nil {
		return nil, fmt.Errorf("config.Load: %w", err)
	}

	for _, path := range paths {
		err = k.Load(file.Provider(path), hcl.Parser(false))
		if err != nil {
			return nil, fmt.Errorf("config.Load: %w", err)
		}
	}

	fmt.Printf("%#v\n", k.Raw())
	return nil, nil

	//// read in embedded config
	//r := bytes.NewReader(eConfigFile)
	//if r == nil {
	//	fmt.Printf("bruhss\n")
	//}
	//err := v.ReadConfig(r)
	//if err != nil {
	//	return nil, fmt.Errorf("config.Load: %w", err)
	//}

	//// try to read these
	//for _, path := range paths {
	//	f, err := os.Open(path)
	//	if err != nil {
	//		if errors.Is(err, os.ErrNotExist) {
	//			fmt.Printf("%q: not found\n", path)
	//			continue
	//		}
	//		return nil, fmt.Errorf("config.Load: %q: %w", path, err)
	//	}

	//	v.MergeConfig(f)
	//	if err != nil {
	//		return nil, fmt.Errorf("config.Load: %w", err)
	//	}
	//}

	//fmt.Printf("hi: %#v\n", v.AllSettings())
	return nil, nil
}
