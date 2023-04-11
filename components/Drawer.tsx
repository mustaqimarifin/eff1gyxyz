import { Button, Drawer } from '@heathmont/moon-core-tw'
import React, { useState } from 'react'

import { NavBar } from './Header'

const DrawerX = () => {
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [isTopOpen, setIsTopOpen] = useState(false)
  const [isBottomOpen, setIsBottomOpen] = useState(false)
  const handleStartClick = () => setIsStartOpen(true)
  const handleTopClick = () => setIsTopOpen(true)
  const handleBottomClick = () => setIsBottomOpen(true)

  return (
    <>
      <Button variant="secondary" onClick={handleStartClick}>
        Show Drawer at start of screen
      </Button>
      <Button variant="secondary" onClick={handleTopClick}>
        Show Drawer at top of screen
      </Button>
      <Button variant="secondary" onClick={handleBottomClick}>
        Show Drawer at bottom of screen
      </Button>
      <Drawer open={isStartOpen} setOpen={setIsStartOpen}>
        <Drawer.Panel position="start" className="bg-pink-400">
          <div
            className={`fixed inset-0 z-20 bg-black bg-opacity-10 transition duration-200 ease-in-out dark:bg-opacity-50 ${
              isStartOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            }`}
            onClick={() => setIsStartOpen(false)}
          />
          <NavBar />
        </Drawer.Panel>
      </Drawer>
      <Drawer open={isTopOpen} setOpen={setIsTopOpen}>
        <Drawer.Panel position="top">
          <div className="flex items-center justify-between border-b border-trunks bg-indigo-400  p-3 shadow-moon-md">
            <p>Screen top aligned Drawer</p>
          </div>
        </Drawer.Panel>
      </Drawer>
      <Drawer open={isBottomOpen} setOpen={setIsBottomOpen}>
        <Drawer.Panel position="bottom">
          <div className="flex items-center justify-between border-b border-trunks bg-amber-400  p-3 shadow-moon-md">
            <p>Screen bottom aligned Drawer</p>
          </div>
          <div className="bg-cell-60 p-3">Drawer content</div>
        </Drawer.Panel>
      </Drawer>
    </>
  )
}

export default DrawerX
