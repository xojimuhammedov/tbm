const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/zuxrd/OneDrive/Рабочий стол/tbm/src/pages/rh-252/a-252/components/View';
const files = fs.readdirSync(dir).filter(f => f.endsWith('view.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add asComponent to Props
  content = content.replace(/interface Props \{/, 'interface Props {\n  asComponent?: boolean;');
  
  // Extract component name and add asComponent
  const componentNameMatch = content.match(/const (Order[a-zA-Z0-9_]+) = \(\{/);
  if (componentNameMatch) {
    const name = componentNameMatch[1];
    content = content.replace(
      new RegExp(`const ${name} = \\(\\{([^}]+)\\}\\s*:\\s*Props\\) => \\{`),
      `const ${name} = ({$1, asComponent}: Props) => {`
    );
  }
  
  // Find return ( <MyModal ...> </MyModal> );
  content = content.replace(/return \(\s*<MyModal([\s\S]*?)<\/MyModal>\s*\);/g, (match, p1) => {
    return `const modalInstance = (\n    <MyModal${p1}</MyModal>\n  );\n\n  if (asComponent) {\n    return <>{modalInstance.props.children}</>;\n  }\n  return modalInstance;`;
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
