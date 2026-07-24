import React from 'react'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import './App.css'

export function ButtonGroup({ children }) {

    let buttonGroupRef = useRef(null)
    let steps = useRef({})
    let [numChildren, setNumChildren] = useState(children.length)
    let [renderTrigger, setRenderTrigger] = useState(0)

    useLayoutEffect(() => {
        let buttonGroup = buttonGroupRef.current
        let resizeObserver = new ResizeObserver(() => {
            setRenderTrigger(t => (t + 1) % 128)
        })
        resizeObserver.observe(buttonGroup)
        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!buttonGroupRef.current) return
        let { clientWidth, scrollWidth } = buttonGroupRef.current
        if (clientWidth < scrollWidth) {
            steps.current[numChildren] = scrollWidth
        }
        if (clientWidth < scrollWidth) {
            // overflow
            setNumChildren(numChildren - 1)
        } else if (steps.current[numChildren + 1] && clientWidth >= steps.current[numChildren + 1]) {
            // underflow
            setNumChildren(numChildren + 1)
        }
    }, [renderTrigger, numChildren])

    let buttongroupChildren = children.slice(children.length - numChildren, children.length)
    // let menuChildren = children.slice(0, numChildren - 1)
    if (numChildren !== children.length) {
        let menuButton = React.createElement("button", {"key": "more-button-1421", "className": "menuButton"}, "Menu...")
        buttongroupChildren = [menuButton, ...buttongroupChildren]
    }

    return (
        <div ref={buttonGroupRef} style={{
            "display": "flex",
            "gap": "10px",
            "padding": "10px",
            }}>
            {buttongroupChildren}
        </div>
    )
}
