// Buat player
let player = sprites.create(img`
    . . . . f f f f . . . . . . . 
        . . f f e e e e f f . . . . . 
            . f e e e e e e e e f . . . . 
                f e e e e e e e e e e f . . . 
                    f e e e f f f f e e e f . . . 
                        f e f f f f f f f f e f . . . 
                            f f f f e e e e f f f f . . . 
                                f f e f b f 4 f b f e f . . . 
                                    . f e 4 1 f d d f 1 4 e f . . 
                                        . f f f f f d d f f f f f . . 
                                            . f f e d d d d d d e f f . . 
                                                . f e f d d b b d d f e f . . 
                                                    . f e e f f f f f f e e f . . 
                                                        . . f e e e e e e e e f . . . 
                                                            . . . f f f f f f f f . . . . 
                                                                . . . . . . . . . . . . . . . 
                                                                `, SpriteKind.Player)
                                                                controller.moveSprite(player)
                                                                player.setStayInScreen(true)

                                                                // Background
                                                                scene.setBackgroundColor(9)

                                                                // Variabel
                                                                info.setScore(0)
                                                                info.setLife(3)

                                                                let spawnSpeed = 2000 // awal musuh muncul tiap 2 detik
                                                                let enemySpeed = -50  // kecepatan awal musuh

                                                                // Player bisa menembak peluru
                                                                controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
                                                                    let projectile = sprites.createProjectileFromSprite(img`
                                                                            . . 2 2 2 . . 
                                                                                    . 2 2 2 2 2 . 
                                                                                            2 2 2 2 2 2 2 
                                                                                                    . 2 2 2 2 2 . 
                                                                                                            . . 2 2 2 . . 
                                                                                                                `, player, 100, 0)
                                                                                                                    music.pewPew.play() // efek suara tembak
                                                                                                                    })

                                                                                                                    // Fungsi spawn musuh
                                                                                                                    function spawnEnemy() {
                                                                                                                        let enemy = sprites.create(img`
                                                                                                                                . . . . c c c c . . . . . . . 
                                                                                                                                        . . c c 5 5 5 5 c c . . . . . 
                                                                                                                                                . c 5 5 5 5 5 5 5 5 c . . . . 
                                                                                                                                                        c 5 5 5 5 5 5 5 5 5 5 c . . . 
                                                                                                                                                                c 5 5 5 d d d d 5 5 5 c . . . 
                                                                                                                                                                        c 5 5 d d 5 5 d d 5 5 c . . . 
                                                                                                                                                                                c 5 5 d 5 5 5 5 d 5 5 c . . . 
                                                                                                                                                                                        . c 5 d 5 5 5 5 d 5 c . . . . 
                                                                                                                                                                                                . . c d d 5 5 d d c . . . . . 
                                                                                                                                                                                                        . . . c c c c c c . . . . . . 
                                                                                                                                                                                                            `, SpriteKind.Enemy)
                                                                                                                                                                                                                enemy.setVelocity(enemySpeed, 0)
                                                                                                                                                                                                                    enemy.setPosition(160, randint(10, 110))
                                                                                                                                                                                                                        enemy.setFlag(SpriteFlag.AutoDestroy, true)
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                        // Spawn musuh sesuai spawnSpeed
                                                                                                                                                                                                                        game.onUpdateInterval(spawnSpeed, function () {
                                                                                                                                                                                                                            spawnEnemy()
                                                                                                                                                                                                                            })

                                                                                                                                                                                                                            // Jika peluru kena musuh
                                                                                                                                                                                                                            sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
                                                                                                                                                                                                                                otherSprite.destroy(effects.fire, 200)
                                                                                                                                                                                                                                    sprite.destroy()
                                                                                                                                                                                                                                        info.changeScoreBy(1)
                                                                                                                                                                                                                                            music.baDing.play() // efek suara skor naik
                                                                                                                                                                                                                                            })

                                                                                                                                                                                                                                            // Jika player kena musuh
                                                                                                                                                                                                                                            sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
                                                                                                                                                                                                                                                otherSprite.destroy(effects.disintegrate, 200)
                                                                                                                                                                                                                                                    info.changeLifeBy(-1)
                                                                                                                                                                                                                                                        music.zapped.play() // efek suara terkena
                                                                                                                                                                                                                                                        })

                                                                                                                                                                                                                                                        // Tingkat kesulitan bertambah seiring waktu
                                                                                                                                                                                                                                                        game.onUpdateInterval(10000, function () { 
                                                                                                                                                                                                                                                            if (spawnSpeed > 500) {
                                                                                                                                                                                                                                                                    spawnSpeed -= 200 // musuh muncul lebih cepat
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                            enemySpeed -= 10 // musuh bergerak lebih cepat
                                                                                                                                                                                                                                                                            })
