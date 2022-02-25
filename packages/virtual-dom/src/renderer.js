/**
 * ORIGINAL CODE BY: https://www.youtube.com/watch?v=l2Tu0NqH0qU
 * MODIFIED BY leaf.js TEAM
 */

/////////////////////////////////////////////////////////////////////
// Main
/////////////////////////////////////////////////////////////////////

// IDs
const CREATE = "CREATE";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";
const UPDATE = "UPDATE";
const SET_PROP = "SET_PROP";
const REMOVE_PROP = "REMOVE_PROP";

// The main render function
export function render(el, renderFunction) {
  var oldNode = renderFunction();
  el.appendChild(createElement(oldNode));
  setTimeout(() => tick(el, 0, renderFunction, oldNode), 500);
}

// The function that is called in JSX
export function h(type, props, ...children) {
  props = props || {};
  return { type, props, children: flatten(children) };
}

function createElement(node) {
  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(node);
  }
  const el = document.createElement(node.type);
  setProps(el, node.props);
  node.children.map(createElement).forEach(el.appendChild.bind(el));
  return el;
}

function tick(el, count, renderFunction, oldNode) {
  var newNode = renderFunction();
  const patches = diff(newNode, oldNode);
  patch(el, patches);
  if (count > 20) {
    return;
  }
  setTimeout(() => tick(el, count + 1, renderFunction, newNode), 500);
}

function flatten(arr) {
  return [].concat.apply([], arr);
}

/////////////////////////////////////////////////////////////////////
// DIFFERENCE
/////////////////////////////////////////////////////////////////////

function changed(newNode, oldNode) {
  return (
    typeof newNode !== typeof oldNode ||
    (typeof newNode === "string" && newNode !== oldNode) ||
    (typeof newNode === "number" && newNode !== oldNode) ||
    newNode.type !== oldNode.type
  );
}

function diff(newNode, oldNode) {
  if (!oldNode) {
    return { type: CREATE, newNode };
  }
  if (!newNode) {
    return { type: REMOVE };
  }
  if (changed(newNode, oldNode)) {
    return { type: REPLACE, newNode };
  }
  if (newNode.type) {
    return {
      type: UPDATE,
      children: diffChildren(newNode, oldNode),
      props: diffProps(newNode, oldNode),
    };
  }
}

function diffChildren(newNode, oldNode) {
  const patches = [];
  const patchesLength = Math.max(
    newNode.children.length,
    oldNode.children.length
  );
  for (let i = 0; i < patchesLength; i++) {
    patches[i] = diff(newNode.children[i], oldNode.children[i]);
  }
  return patches;
}

function diffProps(newNode, oldNode) {
  const patches = [];
  const props = Object.assign({}, newNode.props, oldNode.props);
  Object.keys(props).forEach((name) => {
    const newVal = newNode.props[name];
    const oldVal = oldNode.props[name];
    if (!newVal) {
      patches.push({ type: REMOVE_PROP, name, value: oldVal });
    } else if (!oldVal || newVal !== oldVal) {
      patches.push({ type: SET_PROP, name, value: newVal });
    }
  });
  return patches;
}

/////////////////////////////////////////////////////////////////////
// PATCH
/////////////////////////////////////////////////////////////////////

function patch(parent, patches, index = 0) {
  if (!patches) {
    return;
  }
  const el = parent.childNodes[index];
  switch (patches.type) {
    case CREATE: {
      const { newNode } = patches;
      const newEl = createElement(newNode);
      return parent.appendChild(newEl);
    }
    case REMOVE: {
      parent.removeChild(el);
    }
    case REPLACE: {
      const { newNode } = patches;
      const newEl = createElement(newNode);
      return parent.replaceChild(newEl, el);
    }
    case UPDATE: {
      const { children, props } = patches;
      patchProps(el, props);
      for (let i = 0; i < children.length; i++) {
        patch(el, children[i], i);
      }
    }
  }
}

function patchProps(parent, patches) {
  for (let i = 0; i < patches.length; i++) {
    const { type, name, value } = patches[i];
    if (type === SET_PROP) {
      setProp(parent, name, value);
    }
    if (type === REMOVE_PROP) {
      removeProp(parent, name, value);
    }
  }
}

function removeProp(target, name, value) {
  if (name === "_leaf_event_ONCLICK") {
    return target.removeAttribute("onClickEvent");
  }
  target.removeAttribute(name);
}

function setProp(target, name, value) {
  if (name === "_leaf_event_ONCLICK") {
    return target.setAttribute("onClickEvent", true);
  }
  target.setAttribute(name, value);
}

function setProps(target, props) {
  Object.keys(props).forEach((name) => {
    setProp(target, name, props[name]);
  });
}
