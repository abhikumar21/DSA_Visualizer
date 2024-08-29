const MAX_CHILDREN = 2;

/**
 *
 * @param s - commas separated string
 * @return level order traversal array
 */
export const decode = (s: string) => {
  if (!s || !s.length) {
    return [];
  }
  const isNull = (c: string) => c === "null";

  const prunedArr = s
      // Split by spaces and commas
  .split(/[\s,!&?]+/)
  // Filter out empty strings (if any)
  .filter((c) => c !== "");


  return prunedArr.map((c) => {
    if (isNull(c)) {
      return null;
    }

    return c;
  });
};

type NodeValue = string | number | null | undefined;

class TreeNode {
  name: NodeValue;
  children: TreeNode[];

  constructor(val: NodeValue) {
    this.name = val;
    this.children = [];
  }
}

/**
 *
 * @param {Array} levelOrder
 * @return {TreeNode} root
 */

export const buildTree = (levelOrder: NodeValue[]) => {
  if (!levelOrder.length) {
    throw new Error("Input is empty. Please enter the level order traversal");
  }

  const rootNodeVal = levelOrder.shift();
  if (rootNodeVal === null) {
    throw new Error("Not a valid level order traversal");
  }

  const rootNode = new TreeNode(rootNodeVal);
  const queue = [rootNode];

  while (levelOrder.length) {
    if (queue.length === 0) {
      throw new Error("Not a valid level order traversal");
    }
    // number of nodes on the current level
    const nodes = queue.length * 2;

    let parentNode = queue.shift();
    for (let i = 0; i < nodes; i++) {
      const curNodeVal = levelOrder.shift();
      const isNull = curNodeVal === undefined || curNodeVal === null;
      const curNode = new TreeNode(isNull ? null : curNodeVal);

      if (parentNode?.children.length === MAX_CHILDREN) {
        parentNode = queue.shift();
      }

      if (!isNull) {
        queue.push(curNode);
      }

      parentNode?.children.push(curNode);
    }
  }

  return rootNode;
};

export const isLongText = (s?: string) => s && s.length > 4;
