import * as React from "react"
import { getImageUrl } from '../utils.js';
import {
	SimpleGrid,
    Flex,
    Text,
    Image
} from "@chakra-ui/react"

// Define the AvatarProps interface
interface AvatarProps {
    person: {
        name: string;
        imageId: string;
    };
    size: number;
}

// Define the Avatar component
// The React.FC is a generic type in TypeScript that stands for "React Functional Component". It is a shorthand notation for defining functional components in React
const Avatar: React.FC<AvatarProps> = ({ person, size }) => {
    return (
        <Flex gap={4}>
            <Image 
                flexShrink={0}
                className="avatar"
                src={getImageUrl(person)}
                alt={person.name}
                width={size}
                height={size}
            />
            <Text>{person.name}</Text>
            
        </Flex>
    );
};


// Define the Profile component
const Profile: React.FC = () => {
    return (
        <SimpleGrid columns={[1, 2, 3]} spacing="2rem" py={3}>
            <Avatar size={100} person={{ name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }} />
            <Avatar size={100} person={{ name: 'Aklilu Lemma', imageId: 'OKS67lh' }} />
            <Avatar size={100} person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} />
        </SimpleGrid>
    );
};

export default Profile;