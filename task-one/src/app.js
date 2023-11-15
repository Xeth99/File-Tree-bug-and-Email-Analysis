import FileTree from './fileTree';


export function createFileTree(input) {
  const fileTree = new FileTree();

  const rootNodes = input.shift();

  const rootNodesIds = input.sort((a, b) => a.id - b.id);

  rootNodesIds.unshift(rootNodes);
  
  for (const inputNode of rootNodesIds) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}









