
type Props = {
    children: React.ReactNode;
    title: string;
    description: string;
};

function SectionLayout({ children, title, description }: Props) {
    return (
        <section className="bg-white border border-gray-300 rounded-md p-5 grid gap-4">
            <div>
                <h2 className="text-subtitle font-bold">{title}</h2>
                <p className="text-small text-gray-500">{description}</p>
            </div>
            {children}
        </section>
    );
}

export default SectionLayout